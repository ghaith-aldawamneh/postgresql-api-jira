import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import { Project, User, Issue, Comment } from 'entities';
import { EntityNotFoundError, BadUserInputError } from 'errors';
import { generateErrors } from 'utils/validation';
//import { BaseEntity } from 'typeorm';

type EntityConstructor = typeof Project | typeof User | typeof Issue | typeof Comment;
type EntityInstance = Project | User | Issue | Comment;// promise<Project> ot promise<User>
//EntityConstructor= typeof Project : Promise<InstanceType<T>> | Constructor=T | Constructor.findOne 
//| instance as InstanceType<T> to validate function


//EntityConstructor used for createEntity, updateEntity, deleteEntity(input: Partial<InstanceType<T>>)
//validate,entityInstance= Project : Promise<T>
//type BaseEntity_type = typeof BaseEntity

/** 
extend typeof Project =>we take methods and we use the instanceof<T> since we do not know the shape of it.
extend the class instance => we take the instance.constructor.name 
and not the static or the elements of the class'
*/
const entities:{[key:string]:EntityConstructor} = { Comment, Issue, Project, User };

export const findEntityOrThrow = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  options?: FindOneOptions,
): Promise<InstanceType<T>> => {
  //console.log("typeorm_file findEntityOrThrow Constructor:",Constructor);
  //console.log("typeorm_file findEntityOrThrow typeof Constructor:",typeof Constructor);
  const instance = await Constructor.findOne(id, options);//findOne (:promise<T>)
  //the T is extended BaseEntity because findOne got take from Constructor(extend typeof BaseEntity)
  if (!instance) {
    throw new EntityNotFoundError(Constructor.name);
  }
  //console.log('typeorm_file, findEntityOrThrowinstance',instance);
  //console.log('typeorm_file, findEntityOrThrow typeof instance',typeof instance);
  return instance;
};

export const validateAndSaveEntity = async <T extends EntityInstance>(
   instance: T//instance as InstanceType<T> 
   // that instance comes from  either create(T) (:T extends BaseEntity) then instance as InstanceType<T>{{by the way T is T extends EntityConstructor}}
   // or from findEntityOrThrow :Promise<InstanceType<T>>
 
  ): Promise<T>=>{
  const Constructor = entities[instance.constructor.name];

  //console.log('typeorm_file validateAndSaveEntity instance',instance);
  //console.log('typeorm_file Constructor',Constructor);
  //console.log('typeorm_file Constructor',Constructor);
  //console.log('typeorm_file instance.constructor.name',instance.constructor.name);
  
  if ('validations' in Constructor) {
    /**
    //({ [key: string]: Value`any` } ,
    { [key: string]:('any', {[key:string]:any} )=>false | string;
    */

    //instance: T extend EntityConstructor
    const errorFields = generateErrors(instance, Constructor.validations);
    //({ [key: string]: Value`any` },
    //{ [key: string]:('any', {[key:string]:any} )=>false | string;) ) 
    if (Object.keys(errorFields).length > 0) {
      throw new BadUserInputError({ fields: errorFields });
    }
  }
  const save = instance.save()
  //console.log('typeorm_file validateAndSaveEntity save',save);
  //console.log('typeorm_file validateAndSaveEntity typeof save',typeof save);
  return save as Promise<T>; //save() returns : Promise<this> this means BaseEntiity
//Promise<this> =>(as) Promise<T>
};






export const createEntity = async <T extends EntityConstructor>(
  Constructor: T,
  input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
  //console.log("typeorm_file createEntity Constructor:",Constructor)
  //console.log("typeorm_file createEntity input:",input)
  const instance = Constructor.create(input);//create(T) (:T extends BaseEntity)
  //console.log("typeorm_file instance out of Constructor.create is:",instance)
  //console.log("typeorm_file type instance out of Constructor.create is:",typeof instance)
  return validateAndSaveEntity(instance as InstanceType<T>);
//validateAndSaveEntity takes T extends EntityInstance
};

export const updateEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
  const instance = await findEntityOrThrow(Constructor, id);
  //findEntityOrThrow returns as : Promise<InstanceType<T>> from the findOne (:promise<T>()
  //and it takes 
  Object.assign(instance, input);
  return validateAndSaveEntity(instance);
};

export const deleteEntity = async <T extends EntityConstructor>
(
  Constructor: T,
  id: number | string,
): Promise<InstanceType<T>> => {
  const instance = await findEntityOrThrow(Constructor, id);
  await instance.remove();
  return instance;
};

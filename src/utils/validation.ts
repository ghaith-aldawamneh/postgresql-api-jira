type Value = any;
type ErrorMessage = false | string;
type FieldValues = { [key: string]: Value };
type Validator = (value: Value, fieldValues?: FieldValues) => ErrorMessage;
type FieldValidators = { [key: string]: Validator | Validator[] };
type FieldErrors = { [key: string]: string };


const is = {
  match: (testFn: Function, message = '') => (
    value: Value,
    fieldValues: FieldValues,
  ): ErrorMessage => !testFn(value, fieldValues) && message,

  required: () => (value: Value): ErrorMessage =>
    isNilOrEmptyString(value) && 'This field is required',

  minLength: (min: number) => (value: Value): ErrorMessage =>
    {
      console.log("valuevalue",value) 
      console.log("minmin",min) 
    return !!value && value.length < min && `Must be at least ${min} characters`},

  maxLength: (max: number) => (value: Value): ErrorMessage =>{
  console.log("valuevalue",value) 
  console.log("minmin",max) 
    return !!value && value.length > max && `Must be at most ${max} characters`},

  oneOf: (arr: any[]) => (value: Value): ErrorMessage =>
    !!value && !arr.includes(value) && `Must be one of: ${arr.join(', ')}`,

  notEmptyArray: () => (value: Value): ErrorMessage =>
    Array.isArray(value) && value.length === 0 && 'Please add at least one item',

  email: () => (value: Value): ErrorMessage =>
    !!value && !/.+@.+\..+/.test(value) && 'Must be a valid email',

  url: () => (value: Value): ErrorMessage =>
    !!value &&
    // eslint-disable-next-line no-useless-escape
    !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value) &&
    'Must be a valid URL',
};

const isNilOrEmptyString = (value: Value): boolean =>
  value === undefined || value === null || value === '';
//({ [key: string]: Value`any` },{ [key: string]:('any', {[key:string]:any} )=>false | string;) ) 
export const generateErrors = (
  //type Value = any;
  fieldValues: FieldValues,//this will be the instance of the mongo db filled with the new data 
//{ [key: string]: Value`any` };

  //type Validator = (value: Value`any`, fieldValues?: FieldValues) => ErrorMessage;
  //[key: string]:any :

/**
 *  //example of fieldValidators{ \
 * name: [is.required(),is.maxLength(100)], 
 * url: is.url(), category: [is.required(),
 * is.oneOf(Object.values(ProjectCategory))],}
 */
   fieldValidators: FieldValidators,//{ [key: string]: Validator | Validator[] };
  //{ [key: string]:( 'any', {[key:string]:any} )=>false | string;}
  
): FieldErrors => {
  console.log("isNilOrEmptyString_file fieldValues:x",fieldValues);
  //console.log("isNilOrEmptyString_file FieldValidators:",fieldValidators);
  const fieldErrors: FieldErrors = {};
//title: [is.required(), is.maxLength(200)],
  //the elements of fieldValidators are [name1:[(any1,fieldvalues1),name2:(any2,fieldvalues2)]or one fun as {name1:(any1,fieldvalues1)}
  Object.entries(fieldValidators).forEach((  [fieldName, validators]  ) => {
    //validators is [(any1,fieldvalues1),(any2,fieldvalues2),(any3,fieldvalues3)]
    //console.log("isNilOrEmptyString_file fieldName:",fieldName);
    //console.log("isNilOrEmptyString_file validators:",validators);
    [validators].flat().forEach(validator => {
      //console.log("[validators].constructor()",validator)
      //console.log("[validators].flat()",[validators].flat())
      //console.log("[validators].fieldValues[fieldName]",fieldValues[fieldName])
      console.log("fieldValues",fieldValues)
      console.log("fieldValues[fieldName]",fieldValues[fieldName])
      const errorMessage = validator(fieldValues[fieldName], fieldValues);
      console.log("[errorMessage].errorMessage",errorMessage)
      if (errorMessage !== false && !fieldErrors[fieldName]) {
        fieldErrors[fieldName] = errorMessage;
		console.log('fieldErrorsfieldErrors',fieldErrors);
      }
    });
  });
  return fieldErrors;
};

export default is;

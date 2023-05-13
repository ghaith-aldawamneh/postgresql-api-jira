declare namespace Express234 {
  export interface Response {
   respond: (data: any) => void;
  }
  export interface Request {
    currentUser: import('entities').User;
  }
}
//return the final object with
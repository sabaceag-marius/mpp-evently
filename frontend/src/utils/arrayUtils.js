import axios from "axios";

export function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    let acopy = a.map((x) => x).sort();
    let bcopy = b.map((x) => x).sort();
    for (var i = 0; i < acopy.length; ++i) {
      if (acopy[i] !== bcopy[i]) return false;
    }
    return true;
  }

  export function handleError(error){

    // console.log(error);
    if(!axios.isAxiosError(error) || error.code === "ERR_NETWORK"){
        return "Internal server error"; 
    }

    
    let errorData = error.response?.data.errorMessage;

    if(!errorData) errorData = error.response?.data;

    return errorData;
}

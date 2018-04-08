const validate = (val,rules,connectedValue) =>{
 let isValid =true;
    for(let rule in rules){
        switch(rule){
            case 'isEmail':
            isValid = isValid && emailValidator(val);
            break;
            case 'minLen':
            isValid = isValid && minLenvalidator(val,rules[rule]);
            break;
            case 'equalTo':
            isValid = isValid && equalToValidator(val,connectedValue[rule]);
            break;
            case 'notEmpty':
            isValid = isValid && notEmptyValidator(val);
            break;
            default:
            isValid =true;
        }
    }
    return isValid;
}

const emailValidator = val =>{
 return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(val);
}


const minLenvalidator = (val,minLen) =>{
   return val.length >= minLen;
}


const equalToValidator = (val1, val2) =>{
    
return val1=== val2;
}

const notEmptyValidator = val =>{
    return val.trim() !== "";
}


export default validate;
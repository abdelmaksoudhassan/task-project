import { createParamDecorator } from '@nestjs/common';

export const GetPerson = createParamDecorator((data,req):any=>{
    return req.args[0].user
})
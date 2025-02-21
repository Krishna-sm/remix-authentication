import jwt,{JwtPayload} from 'jsonwebtoken'

const jwt_screate = process.env.JWT_EMAIL ||"@#%^&*(#d%^&*"
export const generateToken=(_id:string)=>{

    const token = jwt.sign({
        userId:_id
    },jwt_screate,{
        expiresIn:'10m'
    })
    return token
}

export const verifyToken =(token:string)=>{
    const payload:any = jwt.verify(token,jwt_screate)
    return payload.userId
}
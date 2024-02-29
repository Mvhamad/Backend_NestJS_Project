import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})

export class User {
    @Prop({type : String, required : true})
    firstname : string
    @Prop({type: String, required : true})
    lastname : string
    @Prop({type: String, required : true})
    address : string
}

export const UserSchema = SchemaFactory.createForClass(User)
import { MinLength } from "class-validator"

export class CreatePostDto {
    @MinLength(3)
    text: string
}
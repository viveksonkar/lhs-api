import { AddCommentsDto } from "@/dtos/comments.dto";
import { Comments } from "@/interfaces/comments.interface";
import { validationMiddleware } from "@/middlewares/validation.middleware";
import CommentsService from "@/services/comments.service";
import { Body, Controller, Get, HttpCode, Post, UseBefore } from "routing-controllers";

@Controller() 
export class CommentsController {

    public commentSerice = new CommentsService();

    @Post('/comments')
    /* @UseBefore(authMiddleware) */
    async getCommentsByUserId(@Body() userId: number) {
         const comments: Comments[] = await this.commentSerice.getCommentsById(userId);
        return { data: comments, message: 'Comments retrieved'} 
    }

    @Post('/addComments')
    /* @UseBefore(authMiddleware) */
    @UseBefore(validationMiddleware( AddCommentsDto, 'body'))
    @HttpCode(200)
    async addComments(@Body() addCommentsDto: AddCommentsDto) {
        const addComments: Comments = await this.commentSerice.addComment(addCommentsDto)
        return { data: addComments, message: 'Comment added successfully'}
    }
}
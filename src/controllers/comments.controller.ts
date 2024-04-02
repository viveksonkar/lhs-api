import { AddCommentsDto } from "@/dtos/comments.dto";
import { Comments } from "@/interfaces/comments.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import { validationMiddleware } from "@/middlewares/validation.middleware";
import CommentsService from "@/services/comments.service";
import { Body, Controller, Get, HttpCode, Param, Post, UseBefore } from "routing-controllers";

@Controller() 
export class CommentsController {

    public commentSerice = new CommentsService();

    @Get('/comments/:id')
    /* @UseBefore(authMiddleware) */
    async getCommentsByUserId(@Param('id') id: number) {
         const comments: Comments[] = await this.commentSerice.getCommentsById(id);
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
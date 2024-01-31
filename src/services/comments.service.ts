import { AddCommentsDto } from "@/dtos/comments.dto";
import { CommentsEntity } from "@/entity/comments.entity";
import { CustomerEntity } from "@/entity/customer.entity";
import { Comments } from "@/interfaces/comments.interface";
import { getRepository, Repository } from "typeorm";

class CommentsService {

    public async getCommentsById(customerId: number): Promise<Comments[]> {
        const commentsRepo: Repository<CommentsEntity> = getRepository(CommentsEntity);
        const comments: Comments[] = await commentsRepo.find({
            where: { customerId: customerId },
            order: { id: "DESC" }
            }   
        )
        return comments;
    }

    public async addComment( addCommentsDto: AddCommentsDto): Promise<Comments> {
        const commentsRepo: Repository<CommentsEntity> = getRepository(CommentsEntity);
        const newComments = {
            ...addCommentsDto,
            commentDate: new Date()
        }
        const savedComment = await commentsRepo.save(newComments)
        return savedComment
    }

}

export default CommentsService
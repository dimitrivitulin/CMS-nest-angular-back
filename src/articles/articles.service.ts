import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './interfaces/article.interface';

@Injectable()
export class ArticlesService {
  constructor (@InjectModel('Article') private readonly articleModel: Model<Article>) {}

  async create(CreateArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(CreateArticleDto);
    return await createdArticle.save();
  }
  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().sort({creationDate: -1}).exec();
  }
  async delete(id:string): Promise<Article> {
    return await this.articleModel.findByIdAndDelete(id);
  }
  async update(id:string, article:UpdateArticleDto) {
    const updateArticle = this.articleModel.findByIdAndUpdate(id, article, { new: true});
    console.log(updateArticle);
    return updateArticle;
    
  }
}


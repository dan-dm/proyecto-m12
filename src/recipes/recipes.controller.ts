import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FetchRecipeDto } from './dto/fetch-recipe.dto';
import { Recipe } from './schemas/recipe.schema';
import { MongooseClassSerializerInterceptor } from '../interceptors/mongooseClassSerializer.interceptor';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('recipes')
@Controller('recipes')
@MongooseClassSerializerInterceptor(FetchRecipeDto)
export class RecipesController {
  private readonly logger = new Logger(RecipesController.name);

  constructor(private readonly recipesService: RecipesService) {}

  /**
   * Register a new recipe
   * @param {CreateRecipeDto} createRecipeDto
   * @return {FetchRecipeDto}
   * @memberof RecipesController
   */
  @ApiCreatedResponse({
    type: FetchRecipeDto,
    isArray: false,
    description: 'Recipe created successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return await this.recipesService.create(createRecipeDto);
  }

  /**
   * Get all recipes
   * @return {[Recipe]}
   * @memberof RecipesController
   */
  @ApiOkResponse({
    type: Recipe,
    isArray: true,
    description: 'Returns all existing recipes or an empty array',
  })
  @Get()
  async findAll(): Promise<Recipe[]> {
    return await this.recipesService.findAll();
  }

  /**
   * Get a single recipe by Id
   * @param {string} id
   * @return {Recipe}
   * @memberof RecipesController
   */
  @ApiNotFoundResponse({ description: 'Recipe was not found in the database' })
  @ApiOkResponse({
    type: Recipe,
    isArray: true,
    description: 'Returns a single recipe',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.recipesService.findOne(id);
  }

  /**
   * Updates information of a single recipe by Id
   * @param {string} id
   * @param {UpdateRecipeDto} updateRecipeDto
   * @return {Recipe}
   * @memberof RecipesController
   */
  @ApiNotFoundResponse({ description: 'Recipe was not found in the database' })
  @ApiOkResponse({
    type: Recipe,
    isArray: false,
    description: 'Updates and returns a single recipe',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return await this.recipesService.update(id, updateRecipeDto);
  }

  /**
   * Deletes a single recipe by Id
   * @param {string} id
   * @memberof RecipesController
   */
  @ApiNotFoundResponse({ description: 'Recipe was not found in the database' })
  @ApiResponse({
    status: 204,
    description: 'No Content: succesfully deleted a Recipe',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.recipesService.remove(id);
  }
}

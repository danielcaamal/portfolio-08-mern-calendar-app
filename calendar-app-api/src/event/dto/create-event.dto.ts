import { Transform } from "class-transformer";
import { IsDate, IsMongoId, IsString, MaxLength, MinLength } from "class-validator";

export class CreateEventDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  start: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  end: Date;

  @IsString()
  @MinLength(3)
  @MaxLength(250)
  notes: string;

  @IsMongoId()
  user: string;
}

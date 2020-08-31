import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { MyProfile } from './my-profile.doc';

export class MyProfileResponse implements IApiResponse<MyProfile> {
  @ApiProperty({ type: [MyProfile] })
  data!: MyProfile;
}

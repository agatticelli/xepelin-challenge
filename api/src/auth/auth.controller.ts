import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/SignIn.dto';
import { SignUpDTO } from './dto/SignUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('register')
  signUp(@Body() signUpDto: SignUpDTO) {
    return this.authService.signUp(signUpDto.username, signUpDto.password);
  }
}

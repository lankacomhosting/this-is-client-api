import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.cookies?.accessToken;

        if (!accessToken) {
            throw new UnauthorizedException('No access token provided');
        }

        try {
            const authApiUrl = process.env.AUTH_SERVICE_API_URL;
            const apiKey = process.env.AUTH_SERVICE_API_KEY;

            const response = await axios.get(`${authApiUrl}/auth/check-auth`, {
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                    'x-api-key': apiKey,
                },
            });

            if (response.data && response.data.id) {

                const user = response.data;
                user.displayName = `${user.firstName} ${user.lastName}`

                request.user = user

                return true;
            }

            return false;

        } catch (error) {
            throw new UnauthorizedException(
                `Authentication Service Error: ${error.response.data.message}`,
            );
        }
    }
}  
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async findMany() {
        return this.appService.findMany();
    }
    async login(Email, password, response) {
        const user = await this.appService.findOne(Email);
        if (!user) {
            throw new common_1.BadRequestException('invalid credentials');
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new common_1.BadRequestException('invalid password credentials');
        }
        const jwt = await this.jwtService.signAsync({ email: user.Email });
        response.cookie('jwt', jwt, { httpOnly: true });
        return {
            message: "Success"
        };
    }
    async register(stationName, Phone, Enseigne, Region, Location, Address, Email, password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await this.appService.create({
            stationName,
            Phone,
            Enseigne,
            Location,
            Region,
            Address,
            Email,
            password: hashedPassword
        });
        delete user.password;
        console.log(user);
        return user;
    }
    async registerClient(Name, Phone, Email, password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await this.appService.create({
            Name,
            Phone,
            Email,
            password: hashedPassword
        });
        delete user.password;
        console.log(user);
        return user;
    }
    async user(request) {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new common_1.UnauthorizedException();
            }
            console.log(data);
            const email = data['email'];
            console.log(email);
            const user = await this.appService.findOne(email);
            const { password, ...result } = user;
            return result;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async logout(response) {
        response.clearCookie('jwt');
        return {
            message: 'success'
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Inject)(jwt_1.JwtService),
    __metadata("design:type", jwt_1.JwtService)
], AppController.prototype, "jwtService", void 0);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findMany", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('Email')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)('stationName')),
    __param(1, (0, common_1.Body)('Phone')),
    __param(2, (0, common_1.Body)('Enseigne')),
    __param(3, (0, common_1.Body)('Region')),
    __param(4, (0, common_1.Body)('Location')),
    __param(5, (0, common_1.Body)('Address')),
    __param(6, (0, common_1.Body)('Email')),
    __param(7, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('registerClient'),
    __param(0, (0, common_1.Body)('Name')),
    __param(1, (0, common_1.Body)('Phone')),
    __param(2, (0, common_1.Body)('Email')),
    __param(3, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "registerClient", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "user", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "logout", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map
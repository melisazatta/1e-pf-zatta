import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { AuthService } from "./auth.service"
import { User } from "src/app/dashboard/pages/users/models";
import { environment } from "src/environments/environment.local";

import { MockProvider } from "ng-mocks"
import { Router } from "@angular/router";

describe('AuthService', () => {

    let authService: AuthService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule],
                providers: [MockProvider(Router)]
        });

        authService = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController)
    });

    it('AuthService should be defined', () => {

        expect(authService).toBeTruthy()
    })

    it('Debe establecer un usuario autenticado al hace login()', () => {

        const USER_MOCK: User = {
            id: 1,
            email: 'fake@mail.com',
            lastName: 'fakeLastName',
            name: 'fakeName',
            role: 'ADMIN',
            token: '4b4jbgj4ekjn5hjn',
            password: '123456',
        };

        authService.login({
            email: USER_MOCK.email,
            password: USER_MOCK.password,
        });

        httpController.expectOne({
            method: 'GET',
            url: `${environment.baseUrl}/users?email=${USER_MOCK.email}&password=${USER_MOCK.password}`
        }).flush([USER_MOCK]);

        authService.authUser$.subscribe({
            next: (authUser) => {
                expect(authUser).toBeTruthy();
                expect(authUser).toEqual(USER_MOCK);
                
            },
        });
        // expect(1).toBe(1);
    })
});
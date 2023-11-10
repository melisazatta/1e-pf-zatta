import { TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "src/app/shared/shared.module";

describe('LoginComponent', () => {
    let loginComponent: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [HttpClientTestingModule, SharedModule],
        });

        const fixture = TestBed.createComponent(LoginComponent);
        loginComponent = fixture.componentInstance;
    });



    it('should create login component', () => {


        expect(loginComponent).toBeTruthy();
    })

    it('Debe marcar todos los campos del form como "touched" si este es invalido', () => {
        loginComponent.loginForm.patchValue({
            email: 'fhdhdhd',
            password: '',
        })
        loginComponent.login();
        expect(loginComponent.emailControl.touched).toBeTrue();
        expect(loginComponent.passwordControl.touched).toBeTrue();
    })

    it ('Debe llamar el metodo login del AuthService si el formulario es valid', () => {
        loginComponent.loginForm.patchValue({
            email: 'fakemail@mail.com',
            password: '123456'
        });
        const spyOnAuthServiceLogin =spyOn((loginComponent as any).authService, 'login');

        loginComponent.login();

        expect(spyOnAuthServiceLogin).toHaveBeenCalled();
    })
})
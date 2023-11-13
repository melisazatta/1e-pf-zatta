import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { UsersComponent } from './users.component';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { UsersService } from './users.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from './models';
import { MatIconModule } from '@angular/material/icon';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { RouterOutlet } from '@angular/router';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockUsersService: jasmine.SpyObj<UsersService>;

  beforeEach(() => {
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockUsersService = jasmine.createSpyObj('UsersService', [
      'getUsers',
      'createUser',
      'updateUser',
      'deleteUser',
    ]);

    TestBed.configureTestingModule({
      declarations: [UsersComponent, UsersTableComponent],
      imports: [
        MatIconModule, RouterOutlet
      ],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: UsersService, useValue: mockUsersService },
      ],
    });

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a user', fakeAsync(() => {
    const mockUserToAdd: User = {  id: 1, name: 'John Doe', lastName: 'lastname', password: 'pass', role: 'role', email: 'email', token: 'token' }; 


    mockMatDialog.open.and.returnValue({
      afterClosed: () => of(mockUserToAdd),
      } as any);
    

    component.addUser();

    tick();

    expect(mockUsersService.createUser).toHaveBeenCalledWith(jasmine.objectContaining({ token: jasmine.any(String) })
    );
}));

  it('should edit a user', fakeAsync(() => {
    const mockUser: User = { id: 1, name: 'John Doe', lastName: 'lastname', password: 'pass', role: 'role', email: 'email', token: 'token' };

    mockMatDialog.open.and.returnValue({
      afterClosed: () => of({ id: 1, name: 'John Doe', lastName: 'lastname', password: 'pass', role: 'role', email: 'email', token: 'token' }),
    } as any);

    component.onEditUser(mockUser);

    tick();

    expect(mockUsersService.updateUser).toHaveBeenCalledWith(mockUser.id, {  id: 1, name: 'John Doe', lastName: 'lastname', password: 'pass', role: 'role', email: 'email', token: 'token'});
  }));

//   it('should delete a user', fakeAsync(() => {
//     const mockUserId = 1;

//     mockUsersService.deleteUser.and.returnValue(of([]));



//     component.onDeleteUser(mockUserId);

    
//     fixture.detectChanges(); 
    
//     tick();


//     expect(mockUsersService.deleteUser).toHaveBeenCalledWith(mockUserId);

//   }));

});
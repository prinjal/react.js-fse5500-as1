import { UserList } from "../components/profile/user-list";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllUsers } from "../services/users-service";
import {
  createUser,
  deleteUsersByUsername
} from "../services/users-service";
import axios from "axios";

//jest.mock('axios');

const MOCKED_USERS = [
  { username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123" },
  { username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234" },
]


describe('user list renders async', () => {
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  // setup test before running test
  beforeAll(async () => {
    // remove any/all users to make sure we create it in the test
    return await deleteUsersByUsername(ripley.username);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    return await deleteUsersByUsername(ripley.username);
  });

  test('user list renders async',async () => {
    const newUser = await createUser(ripley);
    const users = await findAllUsers();
    console.log(users);
    render(
      <HashRouter>
        <UserList users={users} />
      </HashRouter>);
    const linkElement = screen.getByText(/ellenripley/i);
    expect(linkElement).toBeInTheDocument();
  });
});

test('user list renders static user array', () => {
  render(
    <HashRouter>
      <UserList users={MOCKED_USERS} />
    </HashRouter>);
  const linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
});

describe('user list renders mocked', () => {

  // setup test before running test
  beforeAll(async () => {
    jest.spyOn(axios, 'get').mockImplementation();
  });

  // clean up after test runs
  afterAll(async () => {
    jest.restoreAllMocks();
  });


  test('user list renders mocked',async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { users: MOCKED_USERS } }));
    const response = await findAllUsers();
    console.log(response);
    const users = response.users;

    render(
      <HashRouter>
        <UserList users={users} />
      </HashRouter>);

    const user = screen.getByText(/ellen_ripley/i);
    expect(user).toBeInTheDocument();
  });
});

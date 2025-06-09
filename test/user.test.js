const hasuraClient = require("../services/hasuraClient");
const { v4: uuidv4 } = require("uuid");
const userService = require("../services/userService");

jest.mock("../services/hasuraClient");

describe("createUserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.only("Should create a user and return the  created values", async () => {
    const name = "John Doe";
    const email = "john.doe@example.com";
    const password = "1234567";
    const token = "super-token";
    const mockUserId = uuidv4(); // UUID

    const mockCheckEmailResponse = {
      data: {
        data: {
          Users: [], // Simulando que o e-mail não existe no banco
        },
      },
    };

    const mockResponse = {
      data: {
        data: {
          insert_Users_one: {
            id: mockUserId,
            name,
            email,
            password,
          },
        },
      },
    };

    console.log("mockResponseUser " + JSON.stringify(mockResponse));

    // Mock para a verificação do e-mail
    hasuraClient.post.mockResolvedValueOnce(mockCheckEmailResponse);

    // Response mocked from axios
    hasuraClient.post.mockResolvedValueOnce(mockResponse);
    // execute service method
    const result = await userService.createUserService(name, email, password);
    console.log(result);

    // verify if method is correct called
    expect(hasuraClient.post).toHaveBeenCalledWith("", {
      query: expect.stringContaining("mutation"),
      variables: { name, email },
    });

    // expect(result).toEqual({
    //   id: expect.any(String), // Verifica se o id está definido
    //   name,
    //   email,
    // });
  });
  it("Should list all the registered users", async () => {
    const mockUsers = [
      { id: uuidv4(), name: "John Doe", email: "john.doe@example.com" },
      { id: uuidv4(), name: "Jane Doe", email: "jane.doe@example.com" },
    ];

    const mockResponse = {
      data: {
        data: {
          Users: mockUsers,
        },
      },
    };

    // Response mocked from axios
    hasuraClient.post.mockResolvedValueOnce(mockResponse);

    // execute service method
    const result = await userService.getUsersService();

    expect(hasuraClient.post).toHaveBeenCalledWith("", {
      query: expect.stringContaining("query"),
    });

    expect(result).toEqual(mockUsers);
  });
});

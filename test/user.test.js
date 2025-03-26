const hasuraClient = require("../services/hasuraClient");
const { v4: uuidv4 } = require("uuid");
const userService = require("../services/userService");

jest.mock("../services/hasuraClient");

describe("createUserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a user and return the created values", async () => {
    const name = "John Doe";
    const email = "john.doe@example.com";
    const mockUserId = uuidv4(); // UUID

    const mockResponse = {
      data: {
        data: {
          insert_users: {
            returning: [
              {
                id: mockUserId,
                name,
                email,
              },
            ],
          },
        },
      },
    };

    // Response mocked from axios
    hasuraClient.post.mockResolvedValueOnce(mockResponse);

    // execute service method
    const result = await userService.createUserService(name, email);

    // verify if method is correct called
    expect(hasuraClient.post).toHaveBeenCalledWith("", {
      query: expect.stringContaining("mutation"),
      variables: { name, email },
    });

    expect(result).toEqual({
      id: expect.any(String),
      name,
      email,
    });
  });
});

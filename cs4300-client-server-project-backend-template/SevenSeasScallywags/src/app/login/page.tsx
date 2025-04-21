import connectMongoDB from "../../../config/mongodb";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-[20%] text-white">
      <div className="bg-[#3c2222] p-6 rounded-lg shadow-lg w-80">
        <form>
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="username">
            Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-6">
          <label className="block text-sm mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
          Log In
        </button>
      </form>
    </div>
  </div>

  );
}

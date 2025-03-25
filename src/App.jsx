import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://api.restful-api.dev/objects");
        setData(response.data);

        console.log(response);
      } catch (error) {
        console.log(error);
        setError("Error ocurred! unable to fetch data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // console.log(data);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-center">Loading Data.....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-center">{error}</h1>
      </div>
    );
  }
  return (
    <main className="p-6">
      <div className="w-full ">
        {data.length > 0 ? (
          <table className="w-full border overflow-x-auto">
            <thead className="text-left">
              <tr className="py-12 bg-gray-600 text-white font-semibold uppercase">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Colour</th>
                <th className="p-2">Capacity</th>
                <th className="p-2">Generation</th>
                <th className="p-2">ScreenSize</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((item) => (
                <tr key={item.id} className="even:bg-[#eeeeee]">
                  <td className="p-2">{item.id}</td>
                  <td className="p-2 min-w-[250px] text-wrap">{item.name}</td>

                  {item.data ? (
                    <td className="p-2">
                      {item.data["Strap Colour"]
                        ? `${item.data["Strap Colour"]}`
                        : item.data.color || item.data.Color
                        ? `${item.data.color || item.data.Color}`
                        : "N/A"}
                    </td>
                  ) : (
                    <td className="p-2">N/A</td>
                  )}

                  <td className="p-2">
                    {item.data?.Capacity
                      ? `${item.data.Capacity}`
                      : item.data?.capacity
                      ? `${item.data.capacity}`
                      : "N/A"}
                  </td>
                  <td className="p-2">
                    {item.data?.Generation
                      ? `${item.data.Generation}`
                      : item.data?.generation
                      ? `${item.data.generation}`
                      : "N/A"}
                  </td>
                  {item.data ? (
                    <td className="p-2">
                      {item.data["Screen size"]
                        ? `${item.data["Screen size"]}`
                        : "N/A"}
                    </td>
                  ) : (
                    <td className="p-2">N/A</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </main>
  );
};

export default App;

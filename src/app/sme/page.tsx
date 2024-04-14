export type SMEItem = {
  id: number;
  UEN: string;
  CompanyName: string;
  FullName: string;
  Email: string;
  PositionInCompany: string;
  MobNumber: string;
  DocumentsFormData: string[];
  createdAt: string;
  updatedAt: string;
};

async function getAllSME(): Promise<SMEItem[]> {
  return fetch("http://localhost:4000/sme", {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network error ${response.status}`);
      }

      return response.json();
    })
    .then((json) => {
      return json.map((item: any) => {
        Object.defineProperty(item, "createdAt", {
          value: item.createdAt,
          enumerable: false,
        });
        Object.defineProperty(item, "updatedAt", {
          value: item.updatedAt,
          enumerable: false,
        });
        Object.defineProperty(item, "id", {
          value: item.id,
          enumerable: false,
        });
        return item;
      });
    });
}

async function SMEPage() {
  const allSME = await getAllSME();

  return (
    <div className="m-8">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 whitespace-nowrap text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      UEN
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 whitespace-nowrap text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Company Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start whitespace-nowrap text-xs font-medium text-gray-500 uppercase"
                    >
                      Full Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start whitespace-nowrap text-xs font-medium text-gray-500 uppercase"
                    >
                      Position in Company
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start whitespace-nowrap text-xs font-medium text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start whitespace-nowrap text-xs font-medium text-gray-500 uppercase"
                    >
                      Mob Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start whitespace-nowrap text-xs font-medium text-gray-500 uppercase"
                    >
                      Documents
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allSME.map((sme) => {
                    const values = Object.values(sme);
                    return (
                      <tr
                        key={sme.id}
                        className="odd:bg-white even:bg-gray-100"
                      >
                        {values.map((value, index) => {
                          return (
                            <td
                              key={`${sme.id}_${index}`}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                            >
                              {Array.isArray(value) ? value.join(",") : value}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SMEPage;

import { create } from 'zustand'

const orderInformationStore = create((set) => ({
    address: [
        {
          id: 1,
          name: "Ev Adresi",
          info: "1234 Elm Sokağı Springfield, IL 62701 ",
        },
        {
            id: 2,
            name: "İş Adresi",
            info: "5678 Oak Caddesi Springfield, IL 62702",
          },
          {
            id: 2,
            name: "Ev Adresi 2",
            info: "5345 Oak Caddesi Springfield, IL 76545",
          },
      ],
}));

export default orderInformationStore;
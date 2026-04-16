"use client";

import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

export default function InvoicePage() {

  const invoiceRef =
    useRef<HTMLDivElement>(null);

  const [items, setItems] =
    useState<CartItem[]>([]);

  const taxRate = 5;

  // Load Cart

  useEffect(() => {

    const savedCart =
      localStorage.getItem("cart");

    if (savedCart) {

      setItems(
        JSON.parse(savedCart)
      );

    }

  }, []);

  // Calculations

  const subtotal =
    items.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    );

  const tax =
    (subtotal * taxRate) / 100;

  const total =
    subtotal + tax;

  // Generate Random Bill Number

  const billNumber =
    Math.floor(
      100000 + Math.random() * 900000
    );

  // Download PDF

  const downloadPDF = async () => {

    const element =
      invoiceRef.current;

    if (!element) return;

    const canvas =
      await html2canvas(element, {
        scale: 2,
      });

    const imgData =
      canvas.toDataURL("image/png");

    const pdf =
      new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 200], // Receipt Size
      });

    const imgWidth = 70;

    const imgHeight =
      (canvas.height * imgWidth) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      5,
      5,
      imgWidth,
      imgHeight
    );

    pdf.save(
      `Bill-${billNumber}.pdf`
    );

  };

  return (

    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">

      {/* RECEIPT */}

      <div>

        <div
          ref={invoiceRef}
          className="bg-white w-[300px] p-4 text-sm font-mono border"
        >

          {/* HEADER */}

          <div className="text-center border-b pb-2">

            <h1 className="font-bold text-lg">
               RESTAURANT
            </h1>

            <p>
              India
            </p>

            <p>
              GSTIN: 32ABCDE1234F1Z5
            </p>

            <p>
              Phone: 1234567890
            </p>

          </div>

          {/* BILL INFO */}

          <div className="mt-2 text-xs">

            <p>
              Bill No: {billNumber}
            </p>

            <p>
              Date:
              {" "}
              {new Date().toLocaleDateString()}
            </p>

            <p>
              Time:
              {" "}
              {new Date().toLocaleTimeString()}
            </p>

            <p>
              Table: 1
            </p>

          </div>

          {/* ITEMS */}

          <table className="w-full mt-3 text-xs border-t border-b">

            <thead>

              <tr className="text-left">

                <th>Item</th>

                <th className="text-center">
                  Qty
                </th>

                <th className="text-right">
                  Amt
                </th>

              </tr>

            </thead>

            <tbody>

              {items.map((item) => (

                <tr key={item.id}>

                  <td>
                    {item.name}
                  </td>

                  <td className="text-center">
                    {item.qty}
                  </td>

                  <td className="text-right">
                    ₹
                    {(
                      item.price *
                      item.qty
                    ).toFixed(2)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {/* TOTAL */}

          <div className="mt-2 text-xs">

            <div className="flex justify-between">

              <span>
                Subtotal
              </span>

              <span>
                ₹
                {subtotal.toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between">

              <span>
                GST (5%)
              </span>

              <span>
                ₹
                {tax.toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between font-bold border-t mt-1 pt-1">

              <span>
                TOTAL
              </span>

              <span>
                ₹
                {total.toFixed(2)}
              </span>

            </div>

          </div>

          {/* FOOTER */}

          <div className="text-center mt-3 text-xs border-t pt-2">

            <p>
              Thank You! Visit Again
            </p>

          </div>

        </div>

        {/* BUTTON */}

        <button
          onClick={downloadPDF}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded"
        >

          Download PDF

        </button>

      </div>

    </div>

  );

}
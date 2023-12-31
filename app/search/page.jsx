import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { format } from "date-fns";
import InfoCard from "@/components/InfoCard";
import Map from "@/components/Map";

async function getData() {
  const res = await fetch("https://www.jsonkeeper.com/b/5NPS", {
    mode: "no-cors",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Search({searchParams}) {
  const {location, startDate, endDate, noOfGuests} = searchParams
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate}-${formattedEndDate}`;

  const searchResults = await getData();

  return (
    <div className="h-screen">
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults?.map((item) => (
              <InfoCard
                key={item.img}
                img={item.img}
                title={item.title}
                star={item.star}
                location={item.location}
                price={item.price}
                total={item.total}
                description={item.description}
              />
            ))}
          </div>
        </section>
        <section className="hidden md:inline-block min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

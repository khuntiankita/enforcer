import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Services() {
  const servicesData = [
    {
      title: "Contractor",
      desc: "Contractors can book workers from suppliers for their projects.",
    },
    {
      title: "Worker",
      desc: "Workers can request work from suppliers by registering their availability.",
    },
    {
      title: "Supplier",
      desc: "Suppliers can manage workers and get requests from contractors, ensuring workers are assigned efficiently.",
    },
  ];

  return (
    <div className="py-16 bg-[#EEEFE0]">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#2f3d38]">
        How Our Services Work
      </h2>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch w-[90%] mx-auto">
        {servicesData.map((service, index) => (
          <Card
            key={index}
            className="shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 flex-1"
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {service.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {service.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
    
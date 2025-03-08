import React from "react";
import Button from "../components/ReUseableComponents";

export default function HeroSection() {
  return (
    <section className=" bg-blue-50 px-[20rem] py-10">
      <div className="">
        <div>
          <h1>Online coaching that delivers results</h1>
          <p>Explore our online courses</p>
          <div className="flex gap-2">
            <Button rounded="full" borderColor="sky" borderSize="2">
              JEE
            </Button>
            <Button rounded="full" borderColor="sky" borderSize="2">
              NEET
            </Button>
            <Button rounded="full" borderColor="sky" borderSize="2">
              Class 6-10
            </Button>
            <Button rounded="full" borderColor="sky" borderSize="2">
              CUET
            </Button>
          </div>
        </div>
        <div>
        h1
        </div>
      </div>

      <div>
        <Card>
            
        </Card>
      </div>
    </section>
  );
}

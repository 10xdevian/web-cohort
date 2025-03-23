import React from "react";
import Button from "../components/Button";
import { Card } from "../components/Card";
import { AiOutlineArrowRight } from "react-icons/ai";

import Section from "../components/Section";
export default function HeroSection() {
  return (
    <>
      <Section backgroundColor="#eef2f9">
        <div className="flex justify-between mb-20">
          <div className="max-w-[30rem] ">
            <h1 className="text-4xl font-semibold">
              Online coaching that delivers results
            </h1>
            <p className="text-slate-600 font-semibold mt-10 mb-5">
              Explore our online courses
            </p>
            <div className="flex gap-2 font-semibold">
              <Button
                hoverColor="#e28faf"
                rounded="full"
                borderColor="sky"
                borderSize="2"
              >
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
          {/* Carusol  */}
          <div className=" w-[23rem]  h-[15rem] bg-sky-300 rounded-lg ">
            <div> hy</div>
          </div>
        </div>

        <div className="flex justify-center">
          <Card width="1200px" height="300px" backgroundColor="#cdefed">
             
              <div className=" w-[30rem]  bg-slate-200  gap-10">
                <h1>
                  Win up to <span>90% scholarship</span> for JEE, NEET & Class
                  6-10 Courses!
                </h1>
                <Button rounded="full" backgroundColor="sky">
                  <div className="flex gap-2 py-1 items-center px-5 text-white">
                    <p>Register for AOSAT</p>
                    <AiOutlineArrowRight />
                  </div>
                </Button>
              </div>
              <div className="max-w-[20rem] max-h-[10rem] ">
                <img  width="" src="../../public/pumpkin.png" alt="pumpkin" />
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}

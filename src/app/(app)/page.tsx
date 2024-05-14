"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import AutoPlay from "embla-carousel-autoplay";
import messages from "@/messages.json";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
      <section className="text-center mb:text-5xl font-bold ">
        <h1 className="text-3xl md:text-5xl font-bold">
          Dive into the world of Anonymous Chat
        </h1>

        <p className="mt-3 md:mt-4 text-base md:text-lg">
          Expore Mystery Messages -where your identity ramins a secret
        </p>
      </section>

      <Carousel
      plugins={[AutoPlay({delay:2000})]}
      className="w-full max-w-xs">
      <CarouselContent>
      {
        messages.map((message, index) => (
          <CarouselItem key={index}>
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        ))
      }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </main>
  );
}

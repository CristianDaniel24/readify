import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="mb-12">
        <Button>Click me</Button>
      </div>
      <div className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>The fastest animal</CardTitle>
            <CardDescription>The fastest animal is:</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The fastest land animal in the world is the cheetah, which can
              reach speeds of up to 130 kilometers per hour. The peregrine
              falcon is the fastest animal in the air, with a speed of nearly
              320 kilometers per hour.
            </p>
          </CardContent>
          <CardFooter>
            <p>More about the cheetah below:</p>
          </CardFooter>
        </Card>
      </div>
      <div>
        <label htmlFor="text">
          Enter the name of your pet:
          <Input />
        </label>
      </div>
    </div>
  );
}

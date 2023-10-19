/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0AwQeZp
 */
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@ui/components/select";
import { Textarea } from "@ui/components/textarea";
import { Button } from "@ui/components/button";
import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@ui/components/card";
import { cn } from "@ui/lib/utils";
import { Globe, Mail, Phone } from "lucide-react";

export default function VisContactForm() {
  return (
    <div className="relative isolate flex-1 bg-background transition-colors">
      <div className="mx-auto grid max-w-[86rem] grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                className="absolute inset-0 h-full w-full stroke-border [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    x="100%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  className="fill-background-accent"
                />
                <svg
                  x="100%"
                  y={-1}
                  className="overflow-visible fill-background/30"
                >
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Get in touch</h2>
            <p className="mt-6 text-lg leading-8 text-foreground/75">
              Proin volutpat consequat porttitor cras nullam gravida at. Orci
              molestie a eu arcu. Sed ut tincidunt integer elementum id sem.
              Arcu sed malesuada et magna.
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-muted-foreground">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <Globe
                    className="h-7 w-6 text-[hsl(var(--gray-600))]"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  545 Mavis Island
                  <br />
                  Chicago, IL 99191
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <Phone
                    className="h-7 w-6 text-[hsl(var(--gray-600))]"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a
                    className="hover:text-foreground"
                    href="tel:+1 (555) 234-5678"
                  >
                    +1 (555) 234-5678
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail
                    className="h-7 w-6 text-[hsl(var(--gray-600))]"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a
                    className="hover:text-foreground"
                    href="mailto:hello@example.com"
                  >
                    hello@example.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="flex items-center justify-center border-t border-border lg:border-none">
          <Card className={cn("border-none")}>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input
                        id="first-name"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input
                        id="last-name"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pronoun</Label>
                    <Select>
                      {/* //! THIS CHEVRON ICON BREAKS SSR */}
                      <SelectTrigger aria-label="Pronoun">
                        <SelectValue placeholder="Select your pronoun" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Pronouns</SelectLabel>
                          <SelectItem value="he/him">He/Him</SelectItem>
                          <SelectItem value="she/her">She/Her</SelectItem>
                          <SelectItem value="they/them">They/Them</SelectItem>
                          <SelectItem value="prefer not to say">
                            Prefer not to say
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      className="min-h-[100px]"
                      id="message"
                      placeholder="Enter your message"
                    />
                  </div>
                  <Button type="submit">Send message</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

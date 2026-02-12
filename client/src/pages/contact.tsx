import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send, Package } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

const contactSchema = z.object({
  name: z.string().min(2, "Name ist erforderlich"),
  email: z.string().email("Gueltige E-Mail-Adresse eingeben"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein"),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    details: ["Bahnhofstrasse 42", "8001 Zuerich, Schweiz"],
  },
  {
    icon: Phone,
    title: "Telefon",
    details: ["+41 44 123 45 67"],
  },
  {
    icon: Mail,
    title: "E-Mail",
    details: ["info@ovexpack.ch"],
  },
  {
    icon: Clock,
    title: "Oeffnungszeiten",
    details: ["Mo-Fr: 08:00 - 17:00", "Sa-So: Geschlossen"],
  },
];

export default function Contact() {
  useSEO({
    title: "Kontakt",
    description: "Kontaktieren Sie Ovex Pack - Wir helfen Ihnen gerne bei Fragen zu individuell bedruckten Verpackungen.",
  });

  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    toast({
      title: "Nachricht gesendet",
      description: "Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    });
    form.reset();
  };

  return (
    <div data-testid="page-contact">
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/20 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            <Package className="w-3 h-3 mr-1" />
            Wir sind fuer Sie da
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="text-contact-title">
            Kontaktieren Sie uns
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Haben Sie Fragen zu unseren Produkten oder benoetigen Sie eine individuelle Beratung? Unser Team hilft Ihnen gerne weiter.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 lg:p-8">
              <h2 className="text-xl font-semibold mb-6">Nachricht senden</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Ihr Name" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-Mail *</FormLabel>
                          <FormControl>
                            <Input placeholder="ihre@email.ch" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unternehmen</FormLabel>
                          <FormControl>
                            <Input placeholder="Firmenname" {...field} data-testid="input-company" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <FormControl>
                            <Input placeholder="+41..." {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nachricht *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ihre Nachricht..."
                            className="min-h-[120px]"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" data-testid="button-send">
                    <Send className="w-4 h-4 mr-2" />
                    Nachricht senden
                  </Button>
                </form>
              </Form>
            </Card>
          </div>

          <div className="space-y-4">
            {contactInfo.map((info) => (
              <Card key={info.title} className="p-4" data-testid={`card-contact-${info.title.toLowerCase()}`}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                    <info.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-1">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import ThemeMode from "@/components/ThemeMode";
import PageTransition from "@/components/Transitions/Page";
import { Flex, Heading } from "@radix-ui/themes";
import { Zap } from "lucide-react";
import LoginForm from "./form";

export default function Login() {
  return (
    <PageTransition>
      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="4"
        height="100%"
      >
        <Zap size="80px" stroke="#ffff00" />
        <Heading as="h1">AuthTor</Heading>

        <LoginForm />

        <ThemeMode />
      </Flex>
    </PageTransition>
  )
}

import ThemeMode from "@/components/ThemeMode";
import { Flex, Heading } from "@radix-ui/themes";
import { Zap } from "lucide-react";
import LoginForm from "./form";

export default function Login() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap="4"
      height="100vh"
    >
      <Zap size="80px" />
      <Heading as="h1">AuthTor</Heading>

      <LoginForm />

      <ThemeMode />
    </Flex>
  )
}

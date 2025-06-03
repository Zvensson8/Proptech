import React from "react";
import { useHistory } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  Input, 
  Button, 
  Checkbox,
  Divider
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../hooks/use-auth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError("Felaktiga inloggningsuppgifter. Försök igen.");
      } else {
        history.push("/dashboard");
      }
    } catch (err) {
      setError("Ett fel uppstod. Försök igen senare.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <Icon icon="lucide:building" width={40} height={40} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold">FastighetsSystem</h1>
          <p className="text-default-500">Logga in för att fortsätta</p>
        </div>

        <Card className="w-full">
          <CardBody className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-md bg-danger-100 text-danger border border-danger-200 text-sm">
                  {error}
                </div>
              )}

              <Input
                label="E-postadress"
                placeholder="namn@foretag.se"
                type="email"
                value={email}
                onValueChange={setEmail}
                isRequired
                startContent={
                  <Icon icon="lucide:mail" className="text-default-400" />
                }
              />

              <Input
                label="Lösenord"
                placeholder="Ange ditt lösenord"
                type="password"
                value={password}
                onValueChange={setPassword}
                isRequired
                startContent={
                  <Icon icon="lucide:lock" className="text-default-400" />
                }
              />

              <div className="flex items-center justify-between">
                <Checkbox 
                  isSelected={rememberMe}
                  onValueChange={setRememberMe}
                >
                  Kom ihåg mig
                </Checkbox>
                <Button variant="light" size="sm">
                  Glömt lösenord?
                </Button>
              </div>

              <Button 
                type="submit" 
                color="primary" 
                fullWidth
                isLoading={isLoading}
              >
                Logga in
              </Button>
            </form>

            <Divider className="my-4" />

            <div className="text-center text-sm text-default-500">
              <p>Demo-konton:</p>
              <p className="mt-1">admin@example.com / password</p>
              <p>user@example.com / password</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
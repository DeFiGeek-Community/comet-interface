import { Text } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/alert";

const RiskyPoolAlert = () => {
  return (
    <Alert colorScheme={"red"} borderRadius={5} mt="5">
      <AlertIcon />
      <Text color="black">
        Do not use this pool. This pool has risks due to a weak oracle.
      </Text>
    </Alert>
  );
};

export default RiskyPoolAlert;
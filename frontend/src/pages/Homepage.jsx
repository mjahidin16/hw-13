import { HStack, Center, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";

export default function Homepage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <Box>
      <Center w="100vw" h="40vh" bg="gray.100">
        <HStack>
          {books?.books?.map((book) => (
            <Books key={`${book.id} ${book.title}`} {...book} />
          ))}
        </HStack>
      </Center>

      {/* Footer */}
      <Box bg="teal.500" p="4" color="white" textAlign="center" w="100%" position="absolute" bottom="0">
        <Text fontSize="lg">
          © 2024 Sukses Farm. Hak Cipta Dilindungi. Dibuat dengan ❤️ oleh Saya.
        </Text>
      </Box>
    </Box>
  );
}

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box p="4">
      <Heading as="h2" mb="4" color="teal.500">
        Detail Buku
      </Heading>
      {isLoading ? (
        <Skeleton height="300px" my="6" />
      ) : (
        <Flex my="6">
          <Box w="300px">
            <Image
              src={`http://localhost:8000/${book.image}`}
              alt={book.title}
              borderRadius="md"
            />
          </Box>
          <Box ml="8">
            <Heading as="h1" size="lg">
              {book.title}
            </Heading>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              Pengarang: {book.author}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              Penerbit: {book.publisher}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500" mb="4">
              Tahun Terbit: {book.year} | {book.pages} halaman
            </Text>
            {}
            <Box>
              <Heading as="h3" size="md" mb="2">
                Ulasan Pengguna
              </Heading>
              {}
              {book.reviews && book.reviews.length > 0 ? (
                <ul>
                  {book.reviews.map((review, index) => (
                    <li key={index}>{review}</li>
                  ))}
                </ul>
              ) : (
                <Text>Tidak ada ulasan saat ini.</Text>
              )}
            </Box>
          </Box>
        </Flex>
      )}

      {localStorage.getItem("token") && (
        <HStack>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red">Delete</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                Are you sure you want to delete this book?
              </PopoverBody>
              <Button onClick={handleDeleteBook} colorScheme="red">
                Delete
              </Button>
            </PopoverContent>
          </Popover>
          <Link to={`/editbook/${id}`}>
            <Button>Edit</Button>
          </Link>
        </HStack>
      )}
    </Box>
  );
}

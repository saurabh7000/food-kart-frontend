import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@radix-ui/themes";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { CiSearch } from "react-icons/ci";
import { useEffect } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-2 w-full ${
          form.formState.errors.searchQuery && "border-red-600"
        }`}
      >
        <CiSearch className="text-3xl mx-2 hidden md:block" />

        <Controller
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <div className="flex flex-1 items-center justify-between bg-white">
              <input
                {...field}
                className="ml-2 border-none outline-none shadow-none text-xl focus:outline-none focus:ring-0 w-full bg-white"
                type="text"
                placeholder={placeHolder}
              />
            </div>
          )}
        />

        <Button
          type="button"
          color="gray"
          variant="soft"
          className="hover: cursor-pointer"
          onClick={handleReset}
        >
          <Cross1Icon />
        </Button>

        <Button
          type="submit"
          color="orange"
          size="3"
          className="hover: cursor-pointer mx-2"
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default SearchBar;


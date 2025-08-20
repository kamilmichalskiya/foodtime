import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid2,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

const ACTIVITIES = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
const DEFICITS = [0, 0.05, 0.1, 0.15, 0.2];
const GENDERS = [
  { value: "female", label: "Kobieta" },
  { value: "male", label: "Mężczyzna" },
];

export default function Calculator() {
  const [weight, setWeight] = useState<number>(50);
  const [weightError, setWeightError] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(175);
  const [heightError, setHeightError] = useState<boolean>(false);
  const [age, setAge] = useState<number>(25);
  const [ageError, setAgeError] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("female");
  const [kcalBase, setKcalBase] = useState<number>(0);

  const handleNumberInputChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const value = Number.parseFloat(evt.target.value);
    setValue(value);
    setError(!evt.target.validity.valid);
  };

  const handleGenderChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setGender(evt.target.value);
  };

  const calculate = () => {
    if (weightError || heightError || ageError) return;
    const kcal =
      gender === "female"
        ? 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age
        : 66.5 + 13.75 * weight + 5.003 * height - 6.775 * age;
    setKcalBase(Math.round(kcal));
  };

  return (
    <Container component="main">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Kalkulator kalorii
        </Typography>
        <Grid2
          container
          component="form"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid2
            container
            size={{ sm: 3, xs: 12 }}
            justifyContent="center"
            alignItems="center"
            component={Paper}
            padding={2}
          >
            <FormControl variant="filled">
              <FormLabel component="legend">Płeć</FormLabel>
              <TextField
                select
                label="Płeć"
                value={gender}
                onChange={handleGenderChange}
                variant="filled"
                sx={{ m: 1, width: "100%" }}
              >
                {GENDERS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid2>
          <Grid2
            container
            size={{ sm: 3, xs: 12 }}
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              required
              error={weightError}
              id="weight"
              label="Waga"
              type="number"
              variant="filled"
              inputProps={{ min: 20, max: 500, step: 0.1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              }}
              sx={{ m: 1, width: "12ch" }}
              value={weight}
              onChange={(evt) =>
                handleNumberInputChange(evt, setWeight, setWeightError)
              }
            />
          </Grid2>
          <Grid2
            container
            size={{ sm: 3, xs: 12 }}
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              required
              error={heightError}
              id="height"
              label="Wzrost"
              type="number"
              variant="filled"
              inputProps={{ min: 20, max: 300, step: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">cm</InputAdornment>
                ),
              }}
              sx={{ m: 1, width: "12ch" }}
              value={height}
              onChange={(evt) =>
                handleNumberInputChange(evt, setHeight, setHeightError)
              }
            />
          </Grid2>
          <Grid2
            container
            size={{ sm: 3, xs: 12 }}
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              required
              error={ageError}
              id="age"
              label="Wiek"
              type="number"
              variant="filled"
              inputProps={{ min: 18, max: 120, step: 1 }}
              sx={{ m: 1, width: "12ch" }}
              value={age}
              onChange={(evt) =>
                handleNumberInputChange(evt, setAge, setAgeError)
              }
            />
          </Grid2>
        </Grid2>
        <Button variant="outlined" onClick={calculate} sx={{ mt: 2 }}>
          Przelicz
        </Button>
      </Box>
      <Typography align="center" sx={{ mt: 2 }}>
        Podstawa: {kcalBase}
      </Typography>
      <Paper sx={{ mt: 2 }}>
        <TableContainer
          hidden={kcalBase === 0}
          sx={{ display: "inline-block" }}
        >
          <Table aria-label="kcal table">
            <TableHead>
              <TableRow>
                <TableCell>Aktywność (PAL)</TableCell>
                {DEFICITS.map((deficit) => (
                  <TableCell
                    key={deficit}
                    sx={{ whiteSpace: "nowrap", width: "auto" }}
                    align="right"
                  >
                    {deficit * 100}%
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ACTIVITIES.map((activity) => (
                <TableRow
                  key={activity}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ whiteSpace: "nowrap", width: "auto" }}
                    component="th"
                    scope="row"
                  >
                    {activity}
                  </TableCell>
                  {DEFICITS.map((deficit) => {
                    const value = Math.round(
                      kcalBase * activity * (1 - deficit)
                    );
                    return (
                      <TableCell
                        key={deficit}
                        sx={{ whiteSpace: "nowrap", width: "auto" }}
                        align="right"
                      >
                        {value > kcalBase ? value : null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

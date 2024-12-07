import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid2,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const activities = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
const deficits = [0, 0.05, 0.1, 0.15, 0.2];

export default function Calculator() {
  const [weight, setWeight] = useState(50);
  const [weightError, setWeightError] = useState(false);
  const [height, setHeight] = useState(175);
  const [heightError, setHeightError] = useState(false);
  const [age, setAge] = useState(25);
  const [ageError, setAgeError] = useState(false);
  const [gender, setGender] = useState("female");

  const [kcalBase, setKcalBase] = useState(0);

  function hanleNumberInputChange(
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    try {
      const value = Number.parseFloat(evt.target.value);
      setValue(value);
      if (evt.target.validity.valid) {
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }

  function calculate() {
    if (weightError || heightError || ageError) return;
    let kcalBase =
      gender === "female"
        ? 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age
        : 66.5 + 13.75 * weight + 5.003 * height - 6.775 * age;
    setKcalBase(Math.round(kcalBase));
  }

  return (
    <Container component="main">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5">Kalkulator kalorii</Typography>
        <Grid2
          container
          component="form"
          spacing={0}
          justifyContent="center"
          alignItems="center"
        >
          <Grid2
            container
            size={{ sm: 3, xs: 12 }}
            justifyContent="center"
            alignItems="center"
            component={Paper}
            padding={1}
          >
            <FormControl component="fieldset">
              <FormLabel
                id="gender-radio-buttons-group-label"
                component="legend"
              >
                Płeć
              </FormLabel>
              <RadioGroup
                aria-labelledby="gender-radio-buttons-group-label"
                name="radio-buttons-group"
                value={gender}
                onChange={(evt) => setGender(evt.target.value)}
              >
                <FormControlLabel
                  value="female"
                  label="Kobieta"
                  control={<Radio />}
                />
                <FormControlLabel
                  value="male"
                  label="Mężczyzna"
                  control={<Radio />}
                />
              </RadioGroup>
              <FormHelperText></FormHelperText>
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
              slotProps={{
                htmlInput: { min: 20, max: 500, step: 0.1 },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                },
              }}
              sx={{ m: 1, width: "12ch" }}
              value={weight}
              onChange={(evt) =>
                hanleNumberInputChange(evt, setWeight, setWeightError)
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
              slotProps={{
                htmlInput: { min: 20, max: 300, step: 1 },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                },
              }}
              sx={{ m: 1, width: "12ch" }}
              value={height}
              onChange={(evt) =>
                hanleNumberInputChange(evt, setHeight, setHeightError)
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
              slotProps={{ htmlInput: { min: 18, max: 120, step: 1 } }}
              sx={{ m: 1, width: "12ch" }}
              value={age}
              onChange={(evt) =>
                hanleNumberInputChange(evt, setAge, setAgeError)
              }
            />
          </Grid2>
        </Grid2>
        <Button variant="outlined" onClick={calculate}>
          Przelicz
        </Button>
      </Box>
      <Typography align="center">Podstawa: {kcalBase}</Typography>
      <Paper>
        <TableContainer
          hidden={kcalBase === 0}
          style={{ display: "inline-block" }}
        >
          <Table aria-label="kcal table">
            <TableHead>
              <TableRow>
                <TableCell>Aktywność (PAL)</TableCell>
                {deficits.map((deficit) => (
                  <TableCell
                    sx={{ whiteSpace: "nowrap", width: "auto" }}
                    align="right"
                  >
                    {deficit * 100}%
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ whiteSpace: "nowrap", width: "auto" }}
                    component="th"
                    scope="row"
                  >
                    {activity}
                  </TableCell>
                  {deficits.map((deficit) => {
                    const value = Math.round(
                      kcalBase * activity * (1 - deficit)
                    );
                    return (
                      <TableCell
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

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useState } from "react";

function getMonthName(month: number) {
  return [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ][month];
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = getFirstDayOfWeek(currentYear, currentMonth);
  const daysOfWeek = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Build days grid and split into weeks (week starts with Monday)
  const days = [];
  // Adjust so Monday is 0, Sunday is 6
  const offset = (firstDayOfWeek + 6) % 7;
  for (let i = 0; i < offset; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }
  while (days.length % 7 !== 0) {
    days.push(null);
  }
  // Split days into weeks
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <Box
      sx={{
        p: 0.5,
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ mb: 0.5, mt: 0, p: 0, fontWeight: 500 }}>
        Kalendarz
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, mt: 0, p: 0 }}>
        <IconButton
          size="small"
          onClick={handlePrevMonth}
          sx={{ m: 0, p: 0.5 }}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        <Typography
          variant="subtitle1"
          sx={{ flexGrow: 1, textAlign: "center", m: 0, p: 0, fontWeight: 400 }}
        >
          {getMonthName(currentMonth)} {currentYear}
        </Typography>
        <IconButton
          size="small"
          onClick={handleNextMonth}
          sx={{ m: 0, p: 0.5 }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          height: "100%",
          border: "1px solid #eee",
          borderRadius: 0.5,
          display: "flex",
          flexDirection: "column",
          m: 0,
          p: 0,
        }}
      >
        <Grid container spacing={0.25} sx={{ width: "100%", m: 0 }}>
          {daysOfWeek.map((day) => (
            <Grid item xs={1.71} key={day}>
              <Paper
                sx={{
                  p: 0.5,
                  textAlign: "center",
                  fontWeight: "bold",
                  bgcolor: "#f5f5f5",
                  m: 0,
                }}
              >
                {day}
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            m: 0,
            p: 0,
          }}
        >
          {weeks.slice(0, 5).map((week, wIdx) => (
            <Grid
              container
              spacing={0.25}
              key={wIdx}
              sx={{ width: "100%", flex: 1, minHeight: 0, m: 0 }}
            >
              {week.map((day, dIdx) => (
                <Grid
                  item
                  xs={1.71}
                  key={dIdx}
                  sx={{ height: "100%", m: 0, p: 0 }}
                >
                  <Paper
                    sx={{
                      p: 0.5,
                      textAlign: "center",
                      height: "100%",
                      bgcolor:
                        day === today.getDate() &&
                        currentMonth === today.getMonth() &&
                        currentYear === today.getFullYear()
                          ? "#ffe082"
                          : undefined,
                      m: 0,
                    }}
                  >
                    {day || ""}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

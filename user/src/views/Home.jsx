import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Fade,
  Grow,
  Slide,
  Link,
  TextField,
} from "@mui/material";
import HeroImage from "../assets/img/Hero.jpeg";
import WorkerImage from "../assets/img/worker1.jpeg";
import Supplier from "../assets/img/suppliers.jpeg";
import Contractor from "../assets/img/contractor.jpeg";
import User from "../assets/img/user.jpeg";
import { Link as RouterLink } from "react-router-dom";
const Home = () => {
  const colorPrimary = "#735557";
  const colorSecondary = "#A3485A";
  const fontMono = "var(--font-mono)";
  const [showHeroText, setShowHeroText] = useState(false);
  useEffect(() => {
    setShowHeroText(true);
  }, []);

  const features = [
    { title: "Fast Booking", desc: "Book workers instantly and efficiently." },
    { title: "Verified Workers", desc: "All workers are verified for quality." },
    { title: "Reliable Support", desc: "We are here to help 24/7." },
  ];

  const steps = [
    { step: "1", title: "Make a Request", desc: "Contractors or users submit a request to a supplier." },
    { step: "2", title: "Supplier Approves", desc: "Suppliers review requests and assign workers." },
    { step: "3", title: "Work Execution", desc: "Workers perform the assigned task under supplier supervision." },
    { step: "4", title: "Complete & Pay", desc: "Contractors or users confirm completion and pay safely." },
  ];

  const projectRoles = [
    {
      title: "Suppliers",
      desc: "Receive booking requests from contractors and users, manage your registered workers, and deliver services efficiently.",
      img: Supplier,
    },
    {
      title: "Contractors",
      desc: "Submit booking requests to suppliers to get work done quickly and reliably.",
      img: Contractor,
    },
    {
      title: "Users",
      desc: "Easily make requests to suppliers for your work requirements and track progress.",
      img: User,
    },
    {
      title: "Workers",
      desc: "Get verified and assigned to suppliers to work on approved bookings.",
      img: WorkerImage,
    },
  ];

  return (
    <Box sx={{ fontFamily: fontMono, backgroundColor: "#fff9f5" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <Container>
          <Fade in={showHeroText} timeout={1200}>
            <Typography variant="h2" sx={{ fontWeight: "bold", color: colorPrimary }}>
              Welcome to Enforcer
            </Typography>
          </Fade>
          <Slide direction="up" in={showHeroText} timeout={1400}>
            <Typography variant="h5" sx={{ mt: 2, color: colorSecondary }}>
              Streamlining labor booking and services with ease
            </Typography>
          </Slide>
          <Grow in={showHeroText} timeout={1600}>
            <RouterLink
              to="/book">
                <Button

              variant="contained"
              sx={{
                mt: 4,
                backgroundColor: colorPrimary,
                "&:hover": { backgroundColor: colorSecondary, transform: "scale(1.05)" },
                transition: "all 0.3s ease",
              }}
            >
              Get Started
              </Button>
            </RouterLink>
          </Grow>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ mt: 10, mb: 10 }}>
        <Typography
          variant="h4"
          sx={{ color: colorPrimary, textAlign: "center", mb: 5, fontWeight: "bold" }}
        >
          Why Choose Enforcer?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Grow in={showHeroText} style={{ transformOrigin: "0 0 0" }} timeout={1000 + index * 300}>
                <Card
                  sx={{
                    p: 2,
                    textAlign: "center",
                    backgroundColor: "#fff3e6",
                    "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                    transition: "all 0.3s ease",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: colorPrimary, mb: 1, fontWeight: "bold" }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ color: colorSecondary }}>{feature.desc}</Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ mb: 10 }}>
        <Typography
          variant="h4"
          sx={{ color: colorPrimary, textAlign: "center", mb: 5, fontWeight: "bold" }}
        >
          How Enforcer Helps
        </Typography>
        {projectRoles.map((role, index) => (
          <Grid
            container
            spacing={4}
            key={index}
            alignItems="center"
            sx={{ mb: 6 }}
            direction={{ xs: "column", md: "row" }}
          >
            <Grid item xs={12} md={6} order={{ md: index % 2 === 0 ? 1 : 2 }}>
              <Box
                component="img"
                src={role.img}
                alt={role.title}
                sx={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} order={{ md: index % 2 === 0 ? 2 : 1 }}>
              <Grow in={showHeroText} style={{ transformOrigin: "0 0 0" }} timeout={1000 + index * 300}>
                <Box>
                  <Typography variant="h5" sx={{ color: colorPrimary, fontWeight: "bold", mb: 2 }}>
                    {role.title}
                  </Typography>
                  <Typography sx={{ color: colorSecondary, fontSize: "1.1rem" }}>{role.desc}</Typography>
                </Box>
              </Grow>
            </Grid>
          </Grid>
        ))}
      </Container>

      <Container sx={{ mb: 10 }}>
        <Typography
          variant="h4"
          sx={{ color: colorPrimary, textAlign: "center", mb: 5, fontWeight: "bold" }}
        >
          How It Works
        </Typography>
        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Grow in={showHeroText} style={{ transformOrigin: "0 0 0" }} timeout={1200 + index * 300}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: "center",
                    backgroundColor: "#fff3e6",
                    "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: colorPrimary,
                      fontWeight: "bold",
                      mb: 1,
                    }}
                  >
                    {step.step}
                  </Typography>
                  <Typography variant="h6" sx={{ color: colorPrimary, mb: 1, fontWeight: "bold" }}>
                    {step.title}
                  </Typography>
                  <Typography sx={{ color: colorSecondary }}>{step.desc}</Typography>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ textAlign: "center", py: 10, backgroundColor: "#fff3e6" }}>
        <Fade in={showHeroText} timeout={1200}>
          <Typography variant="h4" sx={{ color: colorPrimary, fontWeight: "bold" }}>
            Ready to get started?
          </Typography>
        </Fade>
        <Grow in={showHeroText} timeout={1400}>
          <RouterLink
            to="/register">
              <Button
              variant="contained"
              sx={{
                mt: 4,
                backgroundColor: colorPrimary,
                "&:hover": { backgroundColor: colorSecondary, transform: "scale(1.05)" },
                transition: "all 0.3s ease",
              }}            
              >
            Join Now
            </Button>
          </RouterLink>
        </Grow>
      </Box>

      <Box sx={{ backgroundColor: colorPrimary, color: "#fff", py: 8 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                About Us
              </Typography>
              <Typography>
                Enforcer is your go-to platform for verified workforce booking. Suppliers,
                workers, contractors, and users connect here for smooth and reliable operations.
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Contact Us
              </Typography>
              <Typography>Email: support@enforcer.com</Typography>
              <Typography>Phone: +91 123 456 7890</Typography>
              <Typography>Address: Jamnagar, Gujarat, India</Typography>
            </Grid>
          </Grid>

        
        </Container>
      </Box>
    </Box>
  );
};

export default Home;

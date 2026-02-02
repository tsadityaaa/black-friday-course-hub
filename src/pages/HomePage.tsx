import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { courses } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Gift, LogOut, BookOpen } from "lucide-react";

const HomePage = () => {
  const { user, logout, isSubscribed } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
              <Zap className="h-4 w-4" />
              <span className="font-bold">BLACK FRIDAY</span>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/my-courses" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <BookOpen className="h-4 w-4" />
              My Courses
            </Link>
            <span className="text-sm text-muted-foreground">Hi, {user?.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/20 px-4 py-2 rounded-full mb-6">
            <Gift className="h-5 w-5" />
            <span className="font-semibold">LIMITED TIME OFFER</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Black Friday Course Sale</h1>
          <p className="text-xl opacity-90 mb-6">Use code <strong className="bg-primary-foreground text-primary px-2 py-1 rounded">BFSALE25</strong> for 50% off paid courses!</p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const subscribed = isSubscribed(course.id);
            return (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  {course.price === 0 && (
                    <Badge className="absolute top-3 right-3 bg-green-500">FREE</Badge>
                  )}
                  {subscribed && (
                    <Badge className="absolute top-3 left-3 bg-primary">Enrolled</Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center gap-2">
                    {course.price === 0 ? (
                      <span className="text-2xl font-bold text-green-600">Free</span>
                    ) : (
                      <>
                        <span className="text-2xl font-bold">${course.price.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground line-through">${(course.price * 2).toFixed(2)}</span>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/course/${course.id}`} className="w-full">
                    <Button className="w-full" variant={subscribed ? "secondary" : "default"}>
                      {subscribed ? "View Course" : "View Details"}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

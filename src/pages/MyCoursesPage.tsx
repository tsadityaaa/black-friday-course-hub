import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { courses } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Calendar, DollarSign, LogOut, Home } from "lucide-react";
import { format } from "date-fns";

const MyCoursesPage = () => {
  const { user, logout, subscriptions } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const enrolledCourses = subscriptions.map((sub) => {
    const course = courses.find((c) => c.id === sub.courseId);
    return {
      ...sub,
      course,
    };
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <nav className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Hi, {user?.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-muted-foreground">Your enrolled courses</p>
          </div>
        </div>

        {enrolledCourses.length === 0 ? (
          <Card className="max-w-md mx-auto text-center p-8">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Courses Yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't enrolled in any courses yet. Start exploring our Black Friday deals!
            </p>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse Courses
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((enrollment) => {
              if (!enrollment.course) return null;
              
              return (
                <Card key={enrollment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={enrollment.course.image}
                      alt={enrollment.course.title}
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary">Enrolled</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{enrollment.course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>Price Paid: {enrollment.pricePaid === 0 ? "Free" : `$${enrollment.pricePaid.toFixed(2)}`}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Subscribed: {format(new Date(enrollment.subscribedAt), "MMM dd, yyyy")}</span>
                      </div>
                    </div>
                    <Link to={`/course/${enrollment.course.id}`}>
                      <Button variant="outline" className="w-full">
                        View Course
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCoursesPage;

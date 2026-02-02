import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { courses, validatePromoCode, calculateDiscountedPrice } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Check, Tag, Zap } from "lucide-react";

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSubscribed, subscribe } = useAuth();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isFree = course.price === 0;
  const alreadySubscribed = isSubscribed(course.id);
  const finalPrice = calculateDiscountedPrice(course.price, promoApplied);

  const handleApplyPromo = () => {
    if (validatePromoCode(promoCode)) {
      setPromoApplied(true);
      toast({
        title: "Promo Applied!",
        description: "50% discount has been applied to your order",
      });
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please enter a valid promo code",
        variant: "destructive",
      });
    }
  };

  const handleSubscribe = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      subscribe(course.id, finalPrice);
      toast({
        title: "Successfully Subscribed!",
        description: `You now have access to ${course.title}`,
      });
      setIsLoading(false);
      navigate("/my-courses");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video rounded-xl overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold">{course.title}</h1>
                {isFree && <Badge className="bg-green-500">FREE</Badge>}
                {alreadySubscribed && <Badge variant="secondary">Enrolled</Badge>}
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {course.fullDescription}
              </p>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-2">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  <CardTitle>Black Friday Deal</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {alreadySubscribed ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">You're Enrolled!</h3>
                    <p className="text-muted-foreground">You have full access to this course.</p>
                  </div>
                ) : (
                  <>
                    {/* Price Display */}
                    <div className="text-center pb-4 border-b">
                      {isFree ? (
                        <p className="text-3xl font-bold text-green-600">Free</p>
                      ) : (
                        <div className="space-y-1">
                          {promoApplied ? (
                            <>
                              <p className="text-sm text-muted-foreground line-through">${course.price.toFixed(2)}</p>
                              <p className="text-3xl font-bold text-green-600">${finalPrice.toFixed(2)}</p>
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                <Tag className="h-3 w-3 mr-1" />
                                50% OFF Applied
                              </Badge>
                            </>
                          ) : (
                            <p className="text-3xl font-bold">${course.price.toFixed(2)}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Promo Code for Paid Courses */}
                    {!isFree && !promoApplied && (
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Have a promo code?</label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                            className="uppercase"
                          />
                          <Button variant="outline" onClick={handleApplyPromo}>
                            Apply
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Try: BFSALE25 for 50% off!
                        </p>
                      </div>
                    )}

                    {/* Subscribe Button */}
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleSubscribe}
                      disabled={!isFree && !promoApplied || isLoading}
                    >
                      {isLoading ? "Processing..." : isFree ? "Subscribe for Free" : `Subscribe for $${finalPrice.toFixed(2)}`}
                    </Button>

                    {!isFree && !promoApplied && (
                      <p className="text-xs text-center text-muted-foreground">
                        Apply promo code to unlock subscription
                      </p>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;

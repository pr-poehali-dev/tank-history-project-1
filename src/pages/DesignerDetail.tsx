import { useParams, useNavigate } from "react-router-dom";
import { designers } from "@/data/designers";
import { tanks } from "@/data/tanks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

const DesignerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const designer = designers.find(d => d.id === id);

  if (!designer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Конструктор не найден</h1>
          <Button onClick={() => navigate("/")}>На главную</Button>
        </div>
      </div>
    );
  }

  const designerTanks = tanks.filter(tank => designer.tanks.includes(tank.name));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/?section=designers")}>
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
                <Icon name="Shield" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">ТАНКОТРИЛИЯ</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div>
            <Card className="mb-6">
              <CardContent className="p-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="User" size={64} className="text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-center mb-2">{designer.name}</h1>
                <p className="text-center text-muted-foreground font-mono mb-4">{designer.years}</p>
                <div className="inline-block w-full px-3 py-2 bg-accent/10 text-accent text-sm text-center rounded">
                  {designer.role}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Icon name="Award" className="text-accent" size={20} />
                  Награды и достижения
                </h3>
                <ul className="space-y-2">
                  {designer.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-mono mb-3 rounded">
              БИОГРАФИЯ
            </div>
            <h2 className="text-4xl font-bold mb-6">Жизнь и творчество</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground mb-8">{designer.biography}</p>
            </div>

            <Separator className="my-8" />

            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Factory" className="text-accent" size={32} />
              Созданные танки
            </h2>

            {designerTanks.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {designerTanks.map(tank => (
                  <Card 
                    key={tank.id} 
                    className="group hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => navigate(`/tank/${tank.id}`)}
                  >
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img 
                        src={tank.image} 
                        alt={tank.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-bold mb-1">{tank.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{tank.fullName}</p>
                      <div className="flex gap-2 text-xs font-mono">
                        <span className="px-2 py-1 bg-muted rounded">{tank.year}</span>
                        <span className="px-2 py-1 bg-muted rounded">{tank.type}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {designer.tanks.map((tankName, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <Icon name="Shield" className="text-muted-foreground" size={24} />
                      <div>
                        <div className="font-bold">{tankName}</div>
                        <div className="text-sm text-muted-foreground">Информация в разработке</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerDetail;

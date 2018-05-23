class Slashify < Amber::Pipe::Base
  def call(context)
    path = context.request.path.split("?")
    if path[0][-1] != '/'
      path[0] += "/"
      context.response.headers.add "Location", path[0]
      context.response.status_code = 302
    else
      return call_next(context)
    end
  end
end
